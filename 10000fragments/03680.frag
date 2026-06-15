uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.39 + jf * 4.0), cos(t * 0.37 * jf)) * 0.67;
        xs += sin(length(p - im) * 175.31 - t * 10.96 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.55 + 0.27 * cos(sa * 6 + t * 1.44 + ph);
    v = sin((sr - petal) * 17.88);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.45; p = rot2(1.42) * p; }
	p = rot2(1.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.88);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.64 + time * 0.16, vec3(0.53, 0.43, 0.56), vec3(0.42, 0.33, 0.39), vec3(0.88, 1.29, 0.88), vec3(0.59, 0.13, 0.48));
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
