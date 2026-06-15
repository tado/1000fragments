uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.14 + t * 1.21 + ph) + sin(p.y * 3.92 - t * 4.76 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.17;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	p = fract(p * 2.77) - 0.5;
	p = rot2(p.y * 3.57 + time * 0.44) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.11, 0.54), vec3(0.77, 0.92, 0.43), d);
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
