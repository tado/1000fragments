uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 1.11; vec2 jc = vec2(0.20 + 0.3 * sin(t * 0.99 + ph), 0.41 + 0.3 * cos(t * 0.99 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 19; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.44;
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.11, vec3(0.57, 0.51, 0.42), vec3(0.46, 0.47, 0.38), vec3(1.17, 1.26, 0.91), vec3(0.19, 0.44, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
