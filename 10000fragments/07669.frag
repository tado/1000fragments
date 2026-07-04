uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 7.73;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 1.90)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 12.46 - t * 7.71 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.19 + time * 0.01, vec3(0.52, 0.45, 0.44), vec3(0.31, 0.44, 0.45), vec3(0.98, 1.21, 1.39), vec3(0.26, 0.36, 0.47));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
