uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.08 + t * 3.28 + ph) + sin(p.y * 2.78 - t * 4.03 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p = fract(p * 2.15) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.69 + time * 0.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
