uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.24 * pow(abs(cos(ra * 5.0 + t * 1.59)), 2.48);
    v = sin((rr - pet) * 21.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.45) * p * 13.99;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = mix(vec3(0.08, 0.02, 0.15), vec3(0.71, 0.92, 0.87), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
