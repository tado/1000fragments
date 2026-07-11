uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.52 + t * 1.73 + ph) + sin(p.y * 8.48 - t * 5.16 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 7.51 + time * 2.87) * 0.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.82 + time * 0.29, vec3(0.55, 0.43, 0.40), vec3(0.42, 0.50, 0.50), vec3(0.90, 1.36, 1.35), vec3(0.89, 0.32, 0.90));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
