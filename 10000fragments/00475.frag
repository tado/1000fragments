uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.25 * jf)) * 0.34;
        xs += sin(length(p - im) * 212.20 - t * 10.91 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 6.96 + sr * 10.01 - t * 4.40 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.03, lr * 2.81 + time * 0.72); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.53);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.60 + time * 0.27, vec3(0.56, 0.60, 0.59), vec3(0.49, 0.46, 0.43), vec3(1.30, 1.28, 0.73), vec3(0.70, 0.27, 0.10));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
