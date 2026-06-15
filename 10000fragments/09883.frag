uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.40 + 0.12 * cos(sa * 3 + t * 1.86 + ph);
    v = sin((sr - petal) * 9.47);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.47 * jf)) * 0.62;
        xs += sin(length(p - im) * 218.45 - t * 4.42 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 3.41;
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.30);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.02 + time * 0.22, vec3(0.47, 0.41, 0.60), vec3(0.44, 0.48, 0.37), vec3(0.71, 1.39, 1.07), vec3(0.68, 0.64, 0.66));
	col = fract(col * 1.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
