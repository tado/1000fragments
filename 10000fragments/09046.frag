uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.48 * jf)) * 0.95;
        xs += sin(length(p - im) * 132.78 - t * 7.01 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.57 + sr * 15.82 - t * 3.34 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.86;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.65) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.63, length(p) * 5.87 - time * 0.77); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.72);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.84 + time * 0.08, vec3(0.47, 0.59, 0.56), vec3(0.42, 0.45, 0.34), vec3(1.12, 1.32, 0.97), vec3(0.11, 0.77, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
