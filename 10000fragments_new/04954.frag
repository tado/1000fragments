uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.69 + sin(p.y * 3.17 + t * 3.31) * 3.12 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ p = vec2(atan(p.y, p.x) * 1.48, length(p) * 2.92 - time * 0.87); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.73 + time * 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
