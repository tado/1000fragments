uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 5.83 + sin(p.y * 1.98 + t * 0.71) * 1.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.36;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.16, vec3(0.51, 0.52, 0.51), vec3(0.43, 0.48, 0.39), vec3(1.21, 0.89, 0.74), vec3(0.30, 0.19, 0.17));
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
