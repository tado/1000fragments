uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.05 + t * 0.53) - 0.5) * 2.0;
    v = sin((p.y * 2.52 + zx * 1.73 + t * 0.51) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.32 + time * 0.24, vec3(0.40, 0.40, 0.43), vec3(0.49, 0.46, 0.47), vec3(1.00, 1.06, 0.74), vec3(0.20, 0.98, 0.68));
	col = mod(col * 1.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
