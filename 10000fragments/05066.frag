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
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.50 * jf)) * 0.47;
        xs += sin(length(p - im) * 108.27 - t * 11.80 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.13 + vec2(t * 0.87, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.74;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.47; p = rot2(2.45) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.27);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.02 + time * 0.26, vec3(0.44, 0.56, 0.59), vec3(0.46, 0.43, 0.33), vec3(1.33, 0.79, 0.91), vec3(0.96, 0.64, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.21));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
