uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.12 - t * 1.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.18 + time * 0.43) * p;
	p = (floor(p * 11.4) + 0.5) / 11.4;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.45, 0.47, 0.26), vec3(0.63, 0.73, 0.82), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
