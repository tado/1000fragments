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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.19 * jf)) * 0.39;
        xs += sin(length(p - im) * 161.90 - t * 11.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.27 * cos(sa * 8 + t * 0.77 + ph);
    v = sin((sr - petal) * 7.17);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = rot2(p.y * -2.10 + time * 0.87) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.69 + time * 0.14, vec3(0.53, 0.54, 0.41), vec3(0.49, 0.32, 0.42), vec3(1.09, 1.22, 0.70), vec3(0.56, 0.76, 0.76));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
