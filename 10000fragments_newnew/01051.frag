uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.53 + t * 4.07 + ph) + sin(p.y * 17.09 - t * 4.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	p = (floor(p * 7.8) + 0.5) / 7.8;
	p *= 1.0 + 0.26 * sin(time * 2.38);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.10 + time * 0.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
