uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 9.46 + sr * 12.69 - t * 3.19 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.31, 0.0)) * 23.50 - t * 1.78 + ph);
    float mb = sin(length(p + vec2(0.31, 0.0)) * 39.31 - t * 1.78 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.51);
	float d = d1 + d2;
	vec3 col = palette(d * 0.94 + time * 0.09, vec3(0.59, 0.58, 0.56), vec3(0.41, 0.37, 0.42), vec3(0.80, 1.18, 0.80), vec3(0.04, 0.87, 0.56));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
