uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.91; vec2 jc = vec2(-0.41 + 0.3 * sin(t * 1.01 + ph), 0.48 + 0.3 * cos(t * 1.01 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 16; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(16) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.06, vec3(0.44, 0.54, 0.41), vec3(0.39, 0.34, 0.42), vec3(0.70, 0.86, 0.98), vec3(0.87, 0.09, 0.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
