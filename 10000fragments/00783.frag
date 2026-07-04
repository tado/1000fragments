uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 1.70 + ph), vnoise2(p * 1.70 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 1.70 + 2.66 * wq + vec2(1.7, 9.2) + t * 0.86),
                   vnoise2(p * 1.70 + 3.60 * wq + vec2(8.3, 2.8) - t * 1.11));
    v = vnoise2(p * 1.70 + 2.75 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = fract(p * 1.88) - 0.5;
	p = rot2(time * 0.82) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 1.94 * p.y + time * 1.34); p.y += 0.38 / wf * cos(wf * 3.33 * p.x + time * 1.22); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.39, 0.31, 0.44) * (0.08 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
