uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.56, 0.0)) * 24.85 - t * 2.91 + ph);
    float mb = sin(length(p + vec2(0.56, 0.0)) * 24.31 - t * 2.91 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(p.y * -1.85 + time * 0.70) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.99) - 0.5;
	p *= 2.58;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.38, 0.12, 0.43), vec3(0.86, 0.73, 0.85), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
