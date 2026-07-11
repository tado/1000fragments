uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 11.31 + sin(p.y * 1.18 + t * 5.37) * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.17 + time * 0.13, vec3(0.46, 0.47, 0.52), vec3(0.39, 0.45, 0.46), vec3(1.03, 0.86, 1.25), vec3(0.68, 0.66, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
