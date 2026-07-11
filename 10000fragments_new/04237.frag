uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.81 + sr * 17.31 - t * 2.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.52;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.29, vec3(0.60, 0.48, 0.56), vec3(0.35, 0.38, 0.31), vec3(1.24, 0.83, 1.36), vec3(0.75, 0.73, 0.56));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
