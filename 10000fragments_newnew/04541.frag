uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 6.0 + qr * 3.48 * sin(t * 1.23) + t * 3.73 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.48; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.13, vec3(0.53, 0.50, 0.60), vec3(0.31, 0.48, 0.37), vec3(1.21, 0.84, 1.30), vec3(0.91, 0.45, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
