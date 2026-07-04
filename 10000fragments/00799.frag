uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 3.35 + ga * 4.0 - t * 1.09 + ph);
    v = arm * exp(-gr * 1.49);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.69) * p * 9.72;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.85, 0.94, 0.71), vec3(0.09, 0.02, 0.03), v);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
