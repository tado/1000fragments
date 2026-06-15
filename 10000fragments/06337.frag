uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 27.46 - t * 4.92 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 36.68 - t * 4.92 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p) - 0.43;
	p += vec2(-0.72, 0.40) * sin(length(p) * 5.86 - time * 1.16) * 0.30;
	{ p = vec2(atan(p.y, p.x) * 1.06, length(p) * 3.52 - time * 0.26); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.80 + time * 0.18);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
