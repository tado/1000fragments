uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 tp = p * 4.62; vec2 ti = floor(tp); vec2 tf = fract(tp);
    if(hash21(ti) < 0.5) tf.x = 1.0 - tf.x;
    float dd = min(abs(length(tf) - 0.5), abs(length(tf - vec2(1.0)) - 0.5));
    v = sin(dd * 26.06 - t * 1.26 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.97; vec2 jc = vec2(0.14 + 0.3 * sin(t * 0.73 + ph), 0.34 + 0.3 * cos(t * 0.78 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.69;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.46, lr * 2.11 + time * -0.29); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.61);
	float d = d1 + d2;
	vec3 col = palette(d * 1.74 + time * 0.29, vec3(0.50, 0.51, 0.47), vec3(0.44, 0.46, 0.44), vec3(1.11, 1.27, 0.90), vec3(0.73, 0.95, 0.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
