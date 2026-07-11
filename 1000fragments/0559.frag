uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.22 + sr * 4.86 - t * 2.43 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.06, vec3(0.54, 0.45, 0.56), vec3(0.31, 0.49, 0.42), vec3(0.81, 0.88, 0.94), vec3(0.28, 0.75, 0.31));
	col = fract(col * 2.33);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
