uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 34.92 - t * 4.78 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.92; vec2 jc = vec2(-0.51 + 0.3 * sin(t * 0.37 + ph), 0.19 + 0.3 * cos(t * 1.28 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 28; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 28.0 * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.75;
	p += vec2(0.15, -0.31) * sin(length(p) * 5.76 - time * 1.72) * 0.40;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.34);
	float d = d1 + d2;
	vec3 col = palette(d * 1.76 + time * 0.13, vec3(0.55, 0.45, 0.60), vec3(0.50, 0.38, 0.46), vec3(0.83, 0.81, 1.32), vec3(0.95, 0.89, 0.51));
	col *= 0.89 + 0.15 * sin(gl_FragCoord.y * 2.02 + time * 13.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
