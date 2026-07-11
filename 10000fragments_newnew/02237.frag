uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.24; vec2 jc = vec2(0.13 + 0.3 * sin(t * 0.95 + ph), 0.50 + 0.3 * cos(t * 1.20 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 33; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 33.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(length(p) * -3.34 + time * 0.93) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 2.17 * p.y + time * 1.56); p.y += 0.41 / wf * cos(wf * 2.97 * p.x + time * 2.13); }
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.49; }
	p = rot2(1.30) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.19, vec3(0.49, 0.57, 0.48), vec3(0.39, 0.30, 0.34), vec3(1.37, 0.82, 1.13), vec3(0.78, 0.92, 0.71));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.10;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
