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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.73 + jf * 4.0), cos(t * 0.33 * jf)) * 0.98;
        xs += sin(length(p - im) * 199.42 - t * 4.08 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.32; vec2 jc = vec2(-0.42 + 0.3 * sin(t * 1.14 + ph), -0.65 + 0.3 * cos(t * 1.14 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 36; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(36) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.48;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.17; p = rot2(2.36) * p; }
	p *= 2.04;
	p = rot2(p.y * -3.37 + time * 0.16) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.91);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.52 + time * 0.03, vec3(0.58, 0.49, 0.42), vec3(0.32, 0.42, 0.48), vec3(1.32, 1.04, 0.86), vec3(0.80, 0.79, 0.51));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
