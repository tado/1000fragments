uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.16 + sin(p.y * 5.79 + t * 3.07) * 2.89 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.26;
	{ p = vec2(atan(p.y, p.x) * 1.24, length(p) * 4.13 - time * 0.70); }
	p += vec2(-0.64, 0.59) * sin(length(p) * 4.04 - time * 1.65) * 0.39;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.78 + time * 0.06);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
