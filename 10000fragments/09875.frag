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
        vec2 im = vec2(sin(t * 0.39 + jf * 4.0), cos(t * 0.21 * jf)) * 0.52;
        xs += sin(length(p - im) * 172.48 - t * 4.13 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.89, t * 2.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.96, 0.48) * sin(length(p) * 4.17 - time * 1.23) * 0.35;
	p = fract(p * 2.73) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.17);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.76 + time * 0.19, vec3(0.40, 0.54, 0.53), vec3(0.41, 0.44, 0.43), vec3(0.71, 1.39, 1.10), vec3(0.95, 0.28, 0.97));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
