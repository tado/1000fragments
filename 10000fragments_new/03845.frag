uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 16.40 + t * 3.52 + ph) * 0.7;
    float wb = sin(p.y * 9.46 - t * 1.15 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.56;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.49;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.66 + time * 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
