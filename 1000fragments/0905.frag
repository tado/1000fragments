uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.53 + t * 5.39 + ph) + sin(p.y * 5.66 - t * 1.48 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.44 + time * 0.10, vec3(0.40, 0.50, 0.43), vec3(0.32, 0.32, 0.42), vec3(0.77, 0.93, 0.92), vec3(0.67, 0.48, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
