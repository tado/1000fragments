uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.07 + ga * 5.0 - t * 2.02 + ph);
    v = arm * exp(-gr * 0.57);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.60) * p * 20.08;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.83, 0.91, 0.65), vec3(0.10, 0.10, 0.11), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
