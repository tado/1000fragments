uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.18 * jf)) * 0.85;
        xs += sin(length(p - im) * 128.05 - t * 8.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 16.44);
    float gsh = hash21(vec2(grow, floor(t * 7.90))) - 0.5;
    float gx = p.x + gsh * 0.34;
    v = sin(gx * 14.26 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.68));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	p += vec2(0.99, 0.19) * sin(length(p) * 3.43 - time * 2.38) * 0.14;
	p = (floor(p * 15.4) + 0.5) / 15.4;
	p = fract(p * 2.56) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.78, lr * 2.31 + time * -0.98); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.07 + time * 0.26, vec3(0.49, 0.53, 0.58), vec3(0.41, 0.46, 0.43), vec3(0.79, 0.87, 1.01), vec3(0.19, 0.58, 0.02));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.47 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
