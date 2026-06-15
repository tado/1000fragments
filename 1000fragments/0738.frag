uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.48 + vec2(t * 0.94, -t * 0.94) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.20 + jf * 4.0), cos(t * 0.35 * jf)) * 0.93;
        xs += sin(length(p - im) * 161.50 - t * 13.06 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.07;
	p = fract(p * 2.05) - 0.5;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.35;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.08);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.20, vec3(0.47, 0.45, 0.55), vec3(0.43, 0.31, 0.41), vec3(1.17, 0.77, 1.30), vec3(0.89, 0.85, 0.13));
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
