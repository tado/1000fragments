uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.31 + t * 2.27 + ph) + sin(p.y * 17.45 - t * 1.51 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
