uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.60 + 0.21 * cos(sa * 3 + t * 2.04 + ph);
    v = sin((sr - petal) * 7.07);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.27 * jf)) * 0.76;
        xs += sin(length(p - im) * 69.47 - t * 5.00 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = abs(p);
	p = rot2(time * 0.29) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.26; p = rot2(1.48) * p; }
	p = rot2(length(p) * 1.79 + time * 0.77) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.33);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.71 + time * 0.05, vec3(0.52, 0.40, 0.57), vec3(0.33, 0.31, 0.40), vec3(0.81, 0.91, 0.90), vec3(0.53, 0.52, 0.26));
	col = fract(col * 2.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
