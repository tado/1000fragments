uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.61 + jf * 4.0), cos(t * 0.43 * jf)) * 0.50;
        xs += sin(length(p - im) * 141.74 - t * 6.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.75 + jf * 4.0), cos(t * 0.36 * jf)) * 0.82;
        xs += sin(length(p - im) * 95.34 - t * 13.87 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.18);
	float d = d1 + d2;
	vec3 col = palette(d * 0.57 + time * 0.20, vec3(0.56, 0.57, 0.41), vec3(0.35, 0.39, 0.46), vec3(1.14, 1.29, 1.19), vec3(0.39, 0.24, 0.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
