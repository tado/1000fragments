uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.21 + sin(p.y * 5.16 + t * 1.00) * 3.92 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.98 + time * 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
