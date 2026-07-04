uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.23 + t * 5.23 + ph) + sin(p.y * 11.76 - t * 1.71 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.77 + time * 0.11, vec3(0.48, 0.47, 0.41), vec3(0.43, 0.49, 0.40), vec3(1.33, 0.72, 1.28), vec3(0.43, 0.02, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
