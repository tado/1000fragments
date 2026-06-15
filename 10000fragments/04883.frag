uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.42 + sr * 17.66 - t * 1.63 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.35 + jf * 4.0), cos(t * 0.15 * jf)) * 0.78;
        xs += sin(length(p - im) * 120.53 - t * 5.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = d1 * d2;
	vec3 col = palette(d * 1.09 + time * 0.24, vec3(0.53, 0.43, 0.53), vec3(0.31, 0.31, 0.34), vec3(1.25, 0.75, 1.32), vec3(0.72, 0.73, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
