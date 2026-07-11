uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.35 * jf)) * 0.50;
        xs += sin(length(p - im) * 70.25 - t * 13.33 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.24;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.16, lr * 2.39 + time * 0.39); }
	p += vec2(0.31, 0.66) * sin(length(p) * 3.31 - time * 1.26) * 0.12;
	{ p = vec2(atan(p.y, p.x) * 2.79, length(p) * 5.23 - time * 0.48); }
	p = abs(p) - 0.59;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.20, vec3(0.60, 0.48, 0.49), vec3(0.44, 0.36, 0.32), vec3(0.93, 1.34, 0.81), vec3(0.73, 0.57, 0.81));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
