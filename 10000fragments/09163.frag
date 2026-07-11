uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.29 - t * 5.96 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.54 * jf)) * 0.58;
        xs += sin(length(p - im) * 206.80 - t * 6.45 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.85, length(p) * 3.48 - time * 0.33); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.45; p = rot2(2.09) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = d1 + d2;
	vec3 col = palette(d * 0.94 + time * 0.30, vec3(0.56, 0.43, 0.44), vec3(0.48, 0.45, 0.49), vec3(1.30, 1.18, 0.82), vec3(0.22, 0.13, 0.46));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
