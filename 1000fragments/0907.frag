uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 8.68 + sr * 17.33 - t * 4.84 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.46 + jf * 4.0), cos(t * 0.46 * jf)) * 0.98;
        xs += sin(length(p - im) * 192.84 - t * 12.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.49;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.31);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.77 + time * 0.04, vec3(0.59, 0.44, 0.47), vec3(0.34, 0.47, 0.38), vec3(0.82, 0.78, 1.10), vec3(0.73, 0.93, 0.18));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
