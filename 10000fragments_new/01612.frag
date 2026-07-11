uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.54, 0.0)) * 29.24 - t * 4.09 + ph);
    float mb = sin(length(p + vec2(0.54, 0.0)) * 36.67 - t * 1.90 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.21;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.24 + time * 0.23, vec3(0.55, 0.42, 0.57), vec3(0.42, 0.38, 0.45), vec3(0.82, 1.31, 1.27), vec3(0.70, 0.45, 0.89));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
