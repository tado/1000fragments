uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.45 + t * 5.49 + ph) + sin(p.y * 4.97 - t * 0.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.15;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.28, vec3(0.46, 0.43, 0.52), vec3(0.32, 0.46, 0.41), vec3(1.00, 1.24, 0.87), vec3(0.71, 0.49, 0.63));
	col = mod(col * 2.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
