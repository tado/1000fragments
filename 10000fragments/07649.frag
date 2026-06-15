uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.62 + 0.27 * cos(sa * 7 + t * 1.21 + ph);
    v = sin((sr - petal) * 9.34);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.16 * jf)) * 0.46;
        xs += sin(length(p - im) * 193.97 - t * 11.66 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = d1 + d2;
	vec3 col = palette(d * 1.06 + time * 0.21, vec3(0.59, 0.54, 0.41), vec3(0.39, 0.43, 0.33), vec3(0.80, 1.30, 1.18), vec3(0.18, 0.76, 0.31));
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
