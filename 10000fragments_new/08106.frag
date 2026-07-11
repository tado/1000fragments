uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.32 + sin(p.y * 2.57 + t * 4.12) * 4.69 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = (floor(p * 15.6) + 0.5) / 15.6;
	p = rot2(0.43) * p;
	{ float fr = length(p); p *= 1.0 + 0.46 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.11, 0.53), vec3(0.96, 0.59, 0.60), d);
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
