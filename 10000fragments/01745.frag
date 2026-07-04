uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.33 + sr * 15.16 - t * 4.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.47, 0.03) * sin(length(p) * 4.01 - time * 1.10) * 0.31;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.88 + time * 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
