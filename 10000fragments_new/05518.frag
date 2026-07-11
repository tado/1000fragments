uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.46 + sin(p.y * 5.52 + t * 1.15) * 1.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.19, vec3(0.42, 0.55, 0.43), vec3(0.43, 0.44, 0.34), vec3(1.16, 1.01, 1.33), vec3(0.71, 0.76, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
