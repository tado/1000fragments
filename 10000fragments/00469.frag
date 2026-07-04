uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 zp = p * 8.56;
    vec2 zi = floor(zp); vec2 zf = fract(zp) - 0.5;
    if(hash21(zi + floor(t * 2.73)) < 0.5) zf.x = -zf.x;
    float zd = abs(zf.x + zf.y) * 0.7071068;
    v = sin(zd * 28.96 - t * 4.54 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.40 + time * 0.05, vec3(0.46, 0.58, 0.57), vec3(0.44, 0.34, 0.49), vec3(1.21, 0.85, 0.78), vec3(0.51, 0.75, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
